import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface BlogEditorProps {
    value: string;
    onChange: (data: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
    const [editorState, setEditorState] = useState(
        value
            ? EditorState.createWithContent(value)
            : EditorState.createEmpty()
    );

    const handleEditorChange = (state) => {
        setEditorState(state);
        if (onChange) {
            onChange(convertToRaw(state.getCurrentContent()));
        }
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    return (
        <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px' }}>
            <Editor
                editorState={editorState}
                onChange={handleEditorChange}
                handleKeyCommand={handleKeyCommand}
                placeholder="Write your blog content here..."
            />
        </div>
    );
}