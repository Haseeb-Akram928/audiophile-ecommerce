import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading2, 
  Heading3, 
  Quote, 
  Undo, 
  Redo 
} from 'lucide-react';
import styles from './RichTextEditor.module.css';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const items = [
    {
      icon: Bold,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: Italic,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: Heading2,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: Heading3,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: List,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: Quote,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      type: 'divider',
    },
    {
      icon: Undo,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: Redo,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className={styles.menuBar}>
      {items.map((item, index) => (
        item.type === 'divider' ? (
          <div key={index} className={styles.divider} />
        ) : (
          <button
            key={index}
            type="button"
            className={`${styles.menuItem} ${item.isActive?.() ? styles.isActive : ''}`}
            onClick={item.action}
            title={item.title}
          >
            <item.icon size={18} />
          </button>
        )
      ))}
    </div>
  );
};

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className={styles.editorWrapper}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  );
};

export default RichTextEditor;
