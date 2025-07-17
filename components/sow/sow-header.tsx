interface SOWHeaderProps {
  title: string
  subtitle: string
  company: string
}

export function SOWHeader({ title, subtitle, company }: SOWHeaderProps) {
  return (
    <div className="text-center mb-8 border-b-4 border-green-800 pb-6">
      <h1 className="text-3xl font-semibold text-green-800 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
      <p className="text-gray-600">Company: {company}</p>
    </div>
  )
}
