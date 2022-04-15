type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {children}
    </div>
  )
}
