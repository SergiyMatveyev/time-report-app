import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF'];

export const FormFileUploader = (props: {
  file: FileList | null;
  onChange: (file: FileList) => void;
}) => (
  <div className="w-100 mb-3">
    <FileUploader
      multiple={true}
      handleChange={props.onChange}
      name="file"
      types={fileTypes}
    />
  </div>
);
