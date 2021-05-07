const player = 
{
    position: new Vector(1, 0),
    size: new Vector(8, 8),
    rays: 
    [
        new Ray(new Vector(0, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(1, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(2, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(3, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(4, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(5, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(6, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(7, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(8, 7), new Vector(0, 1), grid.resolution),
        new Ray(new Vector(9, 7), new Vector(0, 1), grid.resolution),
    ],

    rayData: [],

    Draw(ctx)
    {
        ctx.beginPath();
        ctx.fillStyle = '#00FF00';
        ctx.moveTo(this.position.x, this.position.y);
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        ctx.closePath();

        // Cast all rays
        this.rayData = raycast.CastAll(this.rays);
    },
    
    HandleInput(data)
    {
        let direction = new Vector(0, 0);
        switch(data.key)
        {
            case 'w' : direction = new Vector(+0, +1); break;
            case 's' : direction = new Vector(+0, -1); break;
            case 'a' : direction = new Vector(-1, +0); break;
            case 'd' : direction = new Vector(+1, +0); break;
            default: break;
        }

        if(direction.x != 0 || direction.y != 0)
        {
            this.position = this.position.Add(direction);

            // Loop through and update each ray position.
            for(let i = 0; i < this.rays.length; i++)
            {
                this.rays[i].origin = this.rays[i].origin.Add(direction);
            }

            DrawScreen();
        }
        else
        {
            console.error(`Invalid input key '${data.key}'`);
        }
    },
}