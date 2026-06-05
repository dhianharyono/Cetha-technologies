import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonialDoc extends Document {
    orderId: string;
    namaKlien: string;
    namaUsaha: string;
    rating: number;
    ulasan: string;
    avatarUrl?: string;
    isVisible: boolean;
}

const TestimonialSchema: Schema = new Schema(
    {
        orderId: { type: String, required: true },
        namaKlien: { type: String, required: true },
        namaUsaha: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        ulasan: { type: String, required: true },
        avatarUrl: { type: String, required: false },
        isVisible: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonialDoc>('Testimonial', TestimonialSchema);
