import { supabase } from '../supabase/client.js';

export const getAllServices = async (_req, res) => {
    try {
        const { data, error } = await supabase
            .from('government_services')
            .select('*');

        if (error) throw error;
res.status(200).send(JSON.stringify({
    success: true,
    results: data.length,
    data: data
}, null, 2));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message});
    }
};