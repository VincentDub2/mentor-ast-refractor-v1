'use client'
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Logger from "@/lib/logger";
import {deleteObject, ref} from "firebase/storage";
import {storage} from "@/firebaseConfig";


interface IconDeletePdfProps {
    sectionId: number;
    fileUrl: string;
}

const IconDeletePdf: React.FC<IconDeletePdfProps> = ({ sectionId,
                                                         fileUrl
    }) => {
    const handleDelete = async () => {
        try {
            await handleFileDelete();
            const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/sectionVideo/${sectionId}/pdf`, { pdf: '' });

            if (res.status !== 200) {
                 new Error('Failed to delete file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }finally {
            window.location.reload();
        }
    };

    const handleFileDelete = async () => {
        Logger.info('handleFileDelete');
        if (!fileUrl) return;

        const fileRef = ref(storage, fileUrl);
        try {
            await deleteObject(fileRef);

        } catch (error) {
            Logger.error('Error deleting file:' + error);
        }
    };

    return (
        <AiFillDelete
            onClick={handleDelete}
            className="text-red-700 cursor-pointer hover:text-red-500"
        />
    );
}

export default IconDeletePdf;
