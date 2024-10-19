import { WhatsApp } from "./ui/icons"

const WhatsAppButton = ({ number, message }: { number: string, message: string }) => {
  return (
    <a href={`https://wa.me/${number}?text=${message}`} target="_blank" className="z-50">
      <div className="fixed bottom-6 md:bottom-10 right-6 md:right-10 bg-[#25D366] rounded-full p-3 z-50">
        <WhatsApp className="text-white w-7 md:w-8 h-7 md:h-8" />
      </div>
    </a>
  )
}

export default WhatsAppButton