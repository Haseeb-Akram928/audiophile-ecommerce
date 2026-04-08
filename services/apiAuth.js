import { supabase } from "@/lib/supabase";

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (data?.user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    }

    if (profile) {
      data.user.profile = profile;
    }
  }

  return data?.user;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function signup({ fullName, username, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        username,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (data?.user) {
    // Attempt to update the profiles row with the new username directly
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ username, full_name: fullName })
      .eq("id", data.user.id);
      
    if (profileError) {
      console.error("Could not update profiles table:", profileError);
    }
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateAvatar({ userId, file }) {
  // 1. Upload to Supabase Storage avatars bucket
  const fileName = `avatar-${userId}-${Date.now()}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { cacheControl: '3600', upsert: true });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    throw new Error(uploadError.message);
  }

  // 2. Extract public URL
  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  const newAvatarUrl = urlData.publicUrl;

  // 3. Update profiles table
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: newAvatarUrl })
    .eq("id", userId)
    .select()
    .single();

  if (profileError) {
    console.error("Profiles table update error:", profileError);
    throw new Error(profileError.message);
  }

  // 4. Update core auth metadata cache
  await supabase.auth.updateUser({
    data: { avatar: newAvatarUrl },
  });

  return newAvatarUrl;
}

