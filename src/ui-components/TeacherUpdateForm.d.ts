/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeacherUpdateFormInputValues = {
    username?: string;
    email?: string;
};
export declare type TeacherUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeacherUpdateFormOverridesProps = {
    TeacherUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeacherUpdateFormProps = React.PropsWithChildren<{
    overrides?: TeacherUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    teacher?: any;
    onSubmit?: (fields: TeacherUpdateFormInputValues) => TeacherUpdateFormInputValues;
    onSuccess?: (fields: TeacherUpdateFormInputValues) => void;
    onError?: (fields: TeacherUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeacherUpdateFormInputValues) => TeacherUpdateFormInputValues;
    onValidate?: TeacherUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TeacherUpdateForm(props: TeacherUpdateFormProps): React.ReactElement;
