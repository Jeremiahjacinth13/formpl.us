import React, { useState, useRef, useEffect } from 'react'

interface SelectFieldOptions {
  name: string
  options: string[]
  value: string
  onChange: (key: string, value: string) => void
  id?: string
}

const SelectField: React.FC<SelectFieldOptions> = ({
  name,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false)

  const menuElement = useRef<HTMLDivElement>()

  const listener = (e: MouseEvent) => {
    if (!menuElement.current?.contains(e.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.removeEventListener('click', listener)
  }, [isOpen])

  const handleFocus = () => {
    setOpen(true)
    document.addEventListener('click', listener)
  }

  return (
    <div
      className="selectfield__container"
      onFocus={handleFocus}
      ref={menuElement as any}
      data-testid="selectcontainer"
    >
      <label className="selectfield__label">{name}</label>
      <button
        data-testid="selectvalue"
        className="selectfield__value buttonreset"
      >
        {value}
      </button>

      {isOpen && (
        <div className="selectfield__options" data-testid="selectoptions">
          {options.map((option, index) => (
            <button
              data-testid={`selectoption-${index.toString()}`}
              onClick={() => {
                onChange(name, option)
                setOpen(false)
              }}
              className="selectfield__option buttonreset"
              key={`option-${index}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { SelectField }
