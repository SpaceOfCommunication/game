export interface Position2D { 
    x: number; 
    y: number;
}

export interface SimpleTargetProps {
    position?: Position2D;
    onTargetHit?: () => void;
}
