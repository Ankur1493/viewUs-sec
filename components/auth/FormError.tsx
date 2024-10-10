import { TriangleAlert } from "lucide-react"

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center text-red-500 gap-1 rounded-lg px-4 py-0">
      <TriangleAlert size={15} />
      <p className="text-sm ">{message}</p>
    </div>
  )
}
