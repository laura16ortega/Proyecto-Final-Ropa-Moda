import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// signatureName: yup.string().when('signature', {
//     /**
//      * @param value - SignatureName value.
//      * @returns {boolean} - True if signature is defined.
//      */
//     is: (value: string) => value && value.length > 0,
//     then: yup
//       .string()
//       .required('Signature name is required.')
//       .test(
//         'len',
//         'Max. 100 characters',
//         (val) => val === null  val === undefined  val.length < 101,
//       ),
//     otherwise: yup
//       .string()
//       .test(
//         'len',
//         'Max. 100 characters',
//         (val) => val === null  val === undefined  val.length < 101,
//       ),
//   }),

export const PRODUCT_FORM_VALIDATOR_SCHEMA = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  price: yup.number().required("El precio es obligatorio"),
  description: yup.string(),
  category: yup.string().required("La categoria es requerida"),
  gender: yup.string().required("La categoria es requerida"),
  images: yup.string().required("La imagen es requirida"),
  stock: yup.number().required("La cantidad de productos es requerida"),
  tallaPantalon: yup.array(),
  tallaCamiseta: yup.array(),
  marca: yup.string().required("La marca es obligatoria"),
});

export type FormType = typeof PRODUCT_FORM_VALIDATOR_SCHEMA["__outputType"];

export function useCreateForm() {
  const data = useForm<FormType>({
    resolver: yupResolver(PRODUCT_FORM_VALIDATOR_SCHEMA, {}),
    defaultValues: {
      images:
        "https://offcorss.vteximg.com.br/arquivos/ids/595219-1000-1180/51530081-Mostaza-16-0940.jpg?v=637106484369070000",
    },
  });

  return data;
}
