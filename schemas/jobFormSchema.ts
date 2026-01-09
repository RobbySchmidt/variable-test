import {z} from 'zod'

export const jobFormSchema = z.object({
  firstname: z.string({
    invalid_type_error: 'Der Name ist nicht korrekt.'
  }).min(1, 'Dies ist ein Pflichtfeld.'),
  lastname: z.string({
    invalid_type_error: 'Der Name ist nicht korrekt.'
  }).min(1, 'Dies ist ein Pflichtfeld.'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail Adresse ein.'),
  dsgvo: z.literal<boolean>(true, { errorMap: () => ({ message: "Sie müssen die Datenschutzerklärung akzeptieren.", }), }),
  startdate: z.string().date('Bitte geben Sie ein Datum an.'),
  file: z.any().refine((files) => files?.length >= 1, "Bitte laden Sie einen Lebenslauf hoch."),
})