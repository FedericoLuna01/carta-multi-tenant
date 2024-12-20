interface HeadingProps {
  title: string
  description: string
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2
        className="text-4xl font-bold"
      >
        {title}
      </h2>
      <p
        className="text-gray-700"
      >
        {description}
      </p>
    </div>
  )
}

export default Heading