import { useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const BLOCK_MESSAGE = 'Are you sure you want to discard this worksheet?';

export const useNavBlock = (block: boolean) => {
    const history = useHistory();
    const unregisterBlock = useRef<() => void>();
    const unblock = useCallback(() => {
        window.onbeforeunload = null;
        unregisterBlock.current && unregisterBlock.current();
    }, []);
    useEffect(() => {
        if (block) {
            window.onbeforeunload = () => true; // block nav off-site
            unregisterBlock.current = history.block(BLOCK_MESSAGE);
            return unblock;
        }
        unblock();
    }, [block, history, unblock]);
};
