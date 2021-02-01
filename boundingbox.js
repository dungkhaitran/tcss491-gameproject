class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    };

    // VBool VObject::IsCollision( VGameObjectPtr pObject )
    // {	
    //     if (pObject)
    //     {
    //         if (this == pObject || (this->m_rCollisionBound.topLeft.nX >= pObject->m_rCollisionBound.bottomRight.nX)
    //             || (this->m_rCollisionBound.topLeft.nY >= pObject->m_rCollisionBound.bottomRight.nY)
    //             || (this->m_rCollisionBound.bottomRight.nX <= pObject->m_rCollisionBound.topLeft.nX)
    //             || (this->m_rCollisionBound.bottomRight.nY <= pObject->m_rCollisionBound.topLeft.nY))
    //             return VFalse;
    //     }
    //     return VTrue;
    // }
};