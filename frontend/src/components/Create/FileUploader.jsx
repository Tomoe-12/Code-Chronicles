import './style.css'
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import upload from '../../assets/upload.svg'

const FileUploader = ({ files, onChange }) => {
    const convertFileToUrl = (file) => URL.createObjectURL(file);
    

    const onDrop = useCallback((acceptedFiles) => {
        onChange(acceptedFiles);
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
                <div {...getRootProps()} className="file-upload">
                    <input {...getInputProps()} />
                    {files && files.length > 0 ? (
                        <img
                            src={convertFileToUrl(files[0])}
                            width={1000}
                            height={1000}
                            alt="uploaded image"
                            className="max-h-[400px] overflow-hidden object-cover"
                        />
                    ) : (
                        <>
                            <img
                                src={upload}
                                width={60}
                                height={60}
                                alt="upload"
                            />
                            <div className="file-upload_label">
                                <p className="text-14-regular">
                                    <span className="text-green-500 text-lg">
                                        Click to upload
                                    </span> or drag and drop
                                </p>
                                <p>
                                    SVG, PNG, JPG or GIF (max 800x400)
                                </p>
                            </div>
                        </>
                    )}
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                    )}
                </div>
    );
};

export default FileUploader;
