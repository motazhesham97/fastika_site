'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { type ReactNode } from 'react';

interface PageTransitionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: ReactNode;
    className?: string;
}

const motionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};

export default function PageTransition({ children, className, ...props }: PageTransitionProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={motionVariants}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export { PageTransition };
