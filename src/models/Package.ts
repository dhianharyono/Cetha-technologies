import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
    name: string;
    price: string;
    originalPrice?: string;
    description: string;
    features: string[];
    cta: string;
    popular: boolean;
    isHidden: boolean;
}

const PackageSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        originalPrice: { type: String },
        description: { type: String, required: true },
        features: { type: [String], required: true },
        cta: { type: String, required: true, default: 'Pilih Paket' },
        popular: { type: Boolean, default: false },
        isHidden: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);
