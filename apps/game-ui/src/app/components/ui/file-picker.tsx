import React, { FC, useRef } from 'react';

export interface FilePickerProps {
  accept?: string;
  ariaDescribedby?: string;
  onFileSelection?: (files?: FileList) => void
}

const FilePicker: FC<FilePickerProps> = (props) => {

  const { accept, ariaDescribedby, onFileSelection } = props;
  const inputEl = useRef<HTMLInputElement>(null);

  const onChange = () => {
    if (onFileSelection) {
      onFileSelection(inputEl.current?.files as FileList);
    }
  }
  
  return (
    <input type="file" ref={inputEl} 
      accept={accept} 
      aria-describedby={ariaDescribedby} 
      onChange={onChange} />
  )
}

export default FilePicker;