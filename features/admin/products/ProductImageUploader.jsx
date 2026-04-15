import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { supabase } from '@/lib/supabase';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '@/utils/helper';
import styles from './ProductImageUploader.module.css';
import toast from 'react-hot-toast';

const BUCKET_NAME = 'product-images';

const ProductImageUploader = ({ value, onChange, label, folder = 'others' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value ? getImageUrl(value) : null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate if it's an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setIsUploading(true);

      // 1. Compression
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);

      // 2. Prepare file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // 3. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      // 4. Update state and parent form
      onChange(filePath);
      setPreview(URL.createObjectURL(compressedFile));
      toast.success('Image uploaded successfully');

    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setPreview(null);
  };

  return (
    <div className={styles.uploaderContainer}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.uploaderBox}>
        {preview ? (
          <div className={styles.previewContainer}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
            <button 
              type="button" 
              className={styles.removeBtn} 
              onClick={handleRemove}
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className={styles.dropzone}>
            {isUploading ? (
              <div className={styles.status}>
                <Loader2 className={styles.spinner} />
                <span>Uploading...</span>
              </div>
            ) : (
              <div className={styles.status}>
                <Upload size={24} />
                <span>Upload Image</span>
                <span className={styles.hint}>JPG, PNG, WEBP up to 10MB</span>
              </div>
            )}
            <input 
              type="file" 
              className={styles.hiddenInput} 
              onChange={handleUpload} 
              accept="image/*"
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ProductImageUploader;
