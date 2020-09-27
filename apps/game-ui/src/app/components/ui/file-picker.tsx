import React, { FC, useRef } from 'react';

export interface FilePickerProps {
  id?: string;
  accept?: string;
  ariaDescribedby?: string;
  onFileSelection: (files?: FileList) => void
}

const FilePicker: FC<FilePickerProps> = (props) => {

  const inputEl = useRef<HTMLInputElement>(null);

  const onChange = () => {
    props.onFileSelection(inputEl.current?.files as FileList)
  }
  
  return (
    <input type="file" ref={inputEl} 
      id={props.id} 
      accept={props.accept} 
      aria-describedby={props.ariaDescribedby} 
      onChange={onChange} />
  )
}

export default FilePicker;