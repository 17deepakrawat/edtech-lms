import { CKEditor } from 'ckeditor4-react';

export default function MyEditor({ value, onChange }) {
    return (
        <CKEditor
            initData={value}
            onChange={(event) => {
                const data = event.editor.getData();
                onChange(data);
            }}
            config={{
                toolbar: [
                    ['Bold', 'Italic', 'Underline', 'Font', 'FontSize', 'TextColor', 'BGColor', '-', 'NumberedList', 'BulletedList', '-', 'Undo', 'Redo']
                ],
                height: 300,
            }}
        />
    );
}
