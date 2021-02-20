import React from 'react';
import type {
  EdgeInsets,
  OnlyEdgeInsets,
  SymmetricEdgeInsets,
  EdgeInsetsValue,
} from '@fullstack-foundation/react-widgets/core/edge-insets';

interface PaddingProps {
  readonly children: React.ReactNode;
  readonly padding: EdgeInsets;
}

function isOnlyEdgeInsets(padding: EdgeInsets): padding is OnlyEdgeInsets {
  return (
    'top' in (padding as OnlyEdgeInsets) ||
    'right' in (padding as OnlyEdgeInsets) ||
    'bottom' in (padding as OnlyEdgeInsets) ||
    'left' in (padding as OnlyEdgeInsets)
  );
}

function isSymmetricEdgeInsets(padding: EdgeInsets): padding is SymmetricEdgeInsets {
  return (
    'vertical' in (padding as SymmetricEdgeInsets) ||
    'horizontal' in (padding as SymmetricEdgeInsets)
  );
}

function isEdgeInsetsValue(padding: EdgeInsets): padding is EdgeInsetsValue {
  return typeof padding === 'string' || typeof padding === 'number';
}

const value = (v: EdgeInsetsValue) => (typeof v === 'string' ? v : `${v}px`);

function generatePadding(padding: EdgeInsets): string | undefined {
  if (isEdgeInsetsValue(padding)) {
    return value(padding);
  } else if (isSymmetricEdgeInsets(padding)) {
    const { vertical, horizontal } = padding;
    return `${value(vertical)} ${value(horizontal)}`;
  } else if (isOnlyEdgeInsets(padding)) {
    const { top, right, bottom, left } = padding;
    return `${value(top)} ${value(right)} ${value(bottom)} ${value(left)}`;
  }
  return undefined;
}

const Padding: React.FC<PaddingProps> = ({ children, padding }) => {
  console.log(children);
  return React.isValidElement(children) ? (
    React.cloneElement(children, {
      style: { ...(children.props.style || {}), padding: generatePadding(padding) },
    })
  ) : (
    <span style={{ padding: generatePadding(padding) }}>{children}</span>
  );
};

export default Padding;
