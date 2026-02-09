import { supabase } from '../supabase/client.js';

export const getAllServices = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('government_services')
            .select('*');

        if (error) throw error;

        // التعديل هنا: استخدمي .json() مباشرة ومرري الـ Object
        res.status(200).json({
            success: true,
            results: data.length,
            data: data
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};