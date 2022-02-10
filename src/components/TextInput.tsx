interface TextInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  placeholderText?: string
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  placeholderText,
}) => {
  return (
    <div className="textinput__container">
      <input
        data-testid="inputelement"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
      />
    </div>
  )
}

export { TextInput }
