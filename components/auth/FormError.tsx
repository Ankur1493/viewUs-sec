import { TriangleAlert } from "lucide-react"

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex bg-red-100 text-red-900 gap-3 rounded-lg px-4 py-2">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  )
}
