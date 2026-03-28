import { Document } from 'mongoose';
export type ScaleDocument = Scale & Document;
export declare enum ScaleMode {
    MAJOR = "major",
    MINOR = "minor",
    HARMONIC_MINOR = "harmonicMinor"
}
export declare class Scale {
    key: string;
    mode: ScaleMode;
    notes: string[];
    intervals: number[];
    description: string;
    keySignature: {
        sharps: number;
        flats: number;
        accidentals: string[];
    };
    difficulty: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ScaleSchema: import("mongoose").Schema<Scale, import("mongoose").Model<Scale, any, any, any, (Document<unknown, any, Scale, any, import("mongoose").DefaultSchemaOptions> & Scale & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Scale, any, import("mongoose").DefaultSchemaOptions> & Scale & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Scale>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Scale, Document<unknown, {}, Scale, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    key?: import("mongoose").SchemaDefinitionProperty<string, Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    mode?: import("mongoose").SchemaDefinitionProperty<ScaleMode, Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notes?: import("mongoose").SchemaDefinitionProperty<string[], Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    intervals?: import("mongoose").SchemaDefinitionProperty<number[], Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    keySignature?: import("mongoose").SchemaDefinitionProperty<{
        sharps: number;
        flats: number;
        accidentals: string[];
    }, Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    difficulty?: import("mongoose").SchemaDefinitionProperty<number, Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Scale, Document<unknown, {}, Scale, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Scale & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Scale>;
