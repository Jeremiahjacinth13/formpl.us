interface ErrorContainerProps {
  imgSrc: string
  imgAlt?: string
  errorMessage: string
  reload?: () => {}
}

export const ErrorContainer: React.FC<ErrorContainerProps> = ({
  imgSrc,
  imgAlt,
  errorMessage,
  reload,
}) => {
  return (
    <div className="errorContainer">
      <img src={imgSrc} alt={imgAlt} />
      <h1>{errorMessage}</h1>

      {reload && <button onClick={reload}>Retry</button>}
    </div>
  )
}
