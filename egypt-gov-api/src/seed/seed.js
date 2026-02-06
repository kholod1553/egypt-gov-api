import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from '@supabase/supabase-client';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, "../../egypt_government_services.json");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seedData() {
    try {
        console.log("⏳ جاري قراءة ملف الـ JSON...");
        const rawData = fs.readFileSync(jsonPath, "utf8");
        const jsonData = JSON.parse(rawData);

        console.log("✅ تم تحميل الملف بنجاح. جاري الرفع إلى Supabase...");
        const rowsToInsert = [];
        for (const category of jsonData.categories) {
            for (const service of category.services) {
                rowsToInsert.push({
                    category_id: category.id,
                    category_name: category.name,
                    service_id: service.id,
                    service_name: service.name,
                    data: service 
                });
            }
        }
        const { data, error } = await supabase
            .from('government_services')
            .insert(rowsToInsert);

        if (error) throw error;

        console.log(`🚀 تمت العملية بنجاح! تم إدخال ${rowsToInsert.length} سجل.`);

    } catch (err) {
        console.error("❌ حدث خطأ أثناء الرفع:", err.message);
    }
}

seedData();