'use client'
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import Logger from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface FileUploadProps {
    sectionId: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ sectionId }) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (fileUrl) {
                await handleFileDelete();
            }
            setFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        Logger.info('handleFileUpload');
        if (!file) return;

        const storageRef = ref(storage, `uploads/${file.name}`);
        Logger.info('storageRef');

        setLoading(true);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            setFileUrl(url);

            const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/sectionVideo/${sectionId}/pdf`, {
                pdf: url
            });

            if (res.status !== 200) {
                new Error('Failed to upload file');
            }

            Logger.info('File uploaded successfully: ' + res.status);

        } catch (error) {
            Logger.error('Error uploading file: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileDelete = async () => {
        Logger.info('handleFileDelete');
        if (!fileUrl) return;

        const fileRef = ref(storage, fileUrl);
        setLoading(true);
        try {
            await deleteObject(fileRef);
            setFileUrl('');
            setFile(null);
        } catch (error) {
            console.error('Error deleting file:', error);
        } finally {
            setLoading(false);
        }
    };

    const Spinner: React.FC<{ size?: 'small' | 'large', className?: string }> = ({ size = 'large', className = '' }) => {
        const spinnerSize = size === 'small' ? 'h-4 w-4' : 'h-8 w-8';
        return (
            <div className={`animate-spin rounded-full border-t-2 border-b-2 border-gray-900 ${spinnerSize} ${className}`}></div>
        );
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg space-y-6 my-10 p-6">
            <Input type="file" onChange={handleFileChange} disabled={loading} />
            <Button onClick={handleFileUpload} variant="green" disabled={loading}>
                {loading ? (
                    <>
                        <Spinner size="small" className="mr-2" /> Uploading...
                    </>
                ) : (
                    'Upload File'
                )}
            </Button>
            {fileUrl && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                    <p>File uploaded successfully: <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{fileUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
