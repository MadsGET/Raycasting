class Vector 
{
    constructor(xPosition = 0, yPosition = 0)
    {
        this.x = xPosition;
        this.y = yPosition;
    }

    Add(other)
    {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    Direction(squelch = '', reverse = false)
    {
        let x = (squelch == 'x') ? 0 : Math.sign(this.x);
        let y = (squelch == 'y') ? 0 : Math.sign(this.y);

        return (!reverse) ? new Vector(x, y) : new Vector(-x, -y);
    }

    ToString()
    {
        return `(${this.x}, ${this.y})`;
    }
}