import React, { AnchorHTMLAttributes } from 'react'

import TLink from '../transition/TLink'

interface DropdownProp extends React.HTMLAttributes<HTMLDivElement> {
  dropdownDisplay: React.ReactNode
  dropdownItems: React.ReactNode
  classname?: string
}

export const Dropdown = ({
  dropdownDisplay,
  dropdownItems,
  ...props
}: DropdownProp) => {
  return (
    <div {...props} className="relative">
      <div className="peer">{dropdownDisplay}</div>
      <div className="absolute peer-hover:flex hover:flex hidden w-40 pt-2 right-0">
        <div className="w-full outline-4 outline outline-background bg-input text-foreground rounded">
          {dropdownItems}
        </div>
      </div>
    </div>
  )
}

interface DropdownItemProp extends AnchorHTMLAttributes<HTMLAnchorElement> {
  dropdownItem: (React.ReactNode | string)[]
  href: string
}

export const DropdownLinkItem = ({
  href,
  dropdownItem,
  ...props
}: DropdownItemProp) => {
  return (
    <TLink {...props} href={href}>
      {dropdownItem.map((item, i) => (
        <div
          key={i}
          className="flex items-center w-full hover:bg-hover hover:text-background hover:shadow-md py-1 justify-center"
        >
          {item}
        </div>
      ))}
    </TLink>
  )
}
