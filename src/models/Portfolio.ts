import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
    title: string;
    description: string;
    image: string;
    fitur: string[];
    paket: string;
    website?: string;
    isHidden: boolean;
}

const PortfolioSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        fitur: { type: [String], required: true },
        paket: { type: String, required: true },
        website: { type: String, required: false },
        isHidden: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
