import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    return (
        <Editor
            apiKey="ih6cdezfqodprqr0yrl7oi2jupb5b7clspuk7pr1egi6zuq9"
            value={value}
            init={{
                height: 400,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic underline strikethrough | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help | link image',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
            }}
            onEditorChange={(content) => onChange(content)}
        />
    );
} 