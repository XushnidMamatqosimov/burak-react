import { ProductCollection, ProductSize, ProductStatus } from "../enums/productEnum";

export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productCount: number;
    productSize: ProductSize;
    productVolume?: number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date; 
}

export interface ProductInquiry{
    order: string;
    limit: number;
    page: number;
    productCollection?: ProductCollection;
    search?: string;
}