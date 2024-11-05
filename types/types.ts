
export type RegisterInputProps={
    fullName: string;
    email: string;
    password: string;
    phone: string;
    role: any;
};

export type LoginInputProps={
    email: string;
    password: string;
    
};

export type ReviewProps={
    fullName: string;
    occupation: string;
    message: string;
    email: string;
};

export type houseProps = {
    title: string;
    description: string;
    imageUrl: string;
    category: "NORTH" | "SOUTH";
    price: string;
    amenities: string;
};

export type BookingProps = {
    fullName: string;
    emails: string;
    phoneNumber: string;
    paymentMethod: string;
    checkInDate: Date; 
    checkOutDate: Date;
    bookingFor: string;
    houseId: string;
    houseTitle: string;
};

export type ReservationProps = {
    fullName: string;
    emails: string;
    branch: string;
    checkIn: Date; 
    checkOut: Date;
    numberOfhouses: any;
};