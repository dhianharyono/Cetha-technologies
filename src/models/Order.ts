import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    paket: string;
    namaUsaha: string;
    slogan?: string;
    deskripsiSingkat: string;
    kategoriKebutuhan: string;
    pilihanKebutuhan: string;
    sudahDomain: string;
    namaDomain?: string;
    referensiDesain?: string;
    nomorWa: string;
    email?: string;
    linkIg?: string;
    alamatFisik?: string;
    linkMateriVisual?: string;
    status: string; // "Baru", "Diproses", "Selesai", "Batal"
    currentStep?: number; // 1, 2, 3, 4
    createdAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        paket: { type: String, required: true },
        namaUsaha: { type: String, required: true },
        slogan: { type: String },
        deskripsiSingkat: { type: String, required: true },
        kategoriKebutuhan: { type: String, required: true },
        pilihanKebutuhan: { type: String, required: true },
        sudahDomain: { type: String, required: true },
        namaDomain: { type: String },
        referensiDesain: { type: String },
        nomorWa: { type: String, required: true },
        email: { type: String },
        linkIg: { type: String },
        alamatFisik: { type: String },
        linkMateriVisual: { type: String },
        status: { type: String, default: 'Baru' },
        currentStep: { type: Number, default: 1 },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
