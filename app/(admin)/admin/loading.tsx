import Spinner from "@/components/ui/spinner"

const Loading = () => {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
    >
      <Spinner />
    </div>
  )
}

export default Loading