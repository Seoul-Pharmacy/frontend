import React, { useState, useEffect } from 'react';

export default function useIsOpen() {
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return [isOpen, toggleOpen];
}