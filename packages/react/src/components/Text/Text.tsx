import { css, allColors, Colors, cx, utils } from '@fuel/css'
import { createElement } from 'react'
import { FC, PropsWithChildren, ReactHTML } from 'react'

type ParagraphProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

export type TextProps = ParagraphProps &
  PropsWithChildren<{
    as?: keyof ReactHTML
    fontSize?: utils.TextSizes
    fontColor?: Colors
  }>

export const Text: FC<TextProps> = ({
  as = 'p',
  fontSize,
  fontColor,
  children,
  className,
  ...props
}) => {
  const classes = cx(className, styles({ fontSize, fontColor }))
  return createElement(as, { className: classes, ...props }, children)
}

const styles = css({
  variants: {
    // FIX: adjust type type
    fontSize: (utils.textSize.__keys as any[]).reduce(
      (obj, key) => ({
        ...obj,
        [key]: {
          textSize: key,
        },
      }),
      {}
    ),
    // FIX: adjust type type
    fontColor: (allColors as any[]).reduce(
      (obj, key) => ({
        ...obj,
        [key]: {
          color: `$${key}`,
        },
      }),
      {}
    ),
  },

  defaultVariants: {
    fontSize: 'md',
    fontColor: 'fontColor',
  },
})
