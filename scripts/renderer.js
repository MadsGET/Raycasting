const renderer =
{
    resolution: 256,
    backgroundColor: '#696969',
    canvas: null,

    Initialize()
    {
        this.canvas = document.getElementById('scene');
        this.canvas.width = this.resolution;
        this.canvas.height = this.resolution;

        this.Draw(player.rayData);
    },

    Draw(sensorData)
    {
        // Clear the screen
        this.Clear();

        // Guard clause; No sensors data.
        if(sensorData == null) return;

        // Calculate how wide each ray should be.
        let lineWidth = parseInt(this.resolution / sensorData.length);
        let ctx = this.canvas.getContext('2d');

        // Draw background.
        this.DrawBackground(ctx);

        for(let i = 0; i < sensorData.length; i++)
        {
            // Skip any non valid rays
            if(sensorData[i] == -1) continue;

            // Calulate each line height, and its spacing to center it in the screen.
            let lineHeight = (1 - (sensorData[i] / grid.resolution)) * (this.resolution / (sensorData[i] * 0.2));
            let lineSpacing = (this.resolution - lineHeight);

            // console.log(`Line #${i} \nHeight:${lineHeight} \nSpacing: ${lineSpacing}`);

            // Set fill style based on a gray scale color.
            ctx.fillStyle = this.GetGrayScale((1-(sensorData[i] / grid.resolution)));
            ctx.fillRect(i * (lineWidth + 1), lineHeight - (lineHeight - lineSpacing / 2), lineWidth + 1, lineHeight);
            
        }
        // console.log(sensorData);
    },

    DrawBackground(ctx)
    {
        ctx.fillStyle = '#696969';
        ctx.fillRect(0, 0, this.resolution / 2, this.resolution / 2);
        ctx.fillStyle = '#252525';
        ctx.fillRect(0, this.resolution / 2, this.resolution, this.resolution);

    },

    Clear()
    {
        let ctx = this.canvas.getContext('2d');
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.resolution, this.resolution);
    },

    GetGrayScale(value)
    {
        let scale = value * 64;
        return `rgb(${scale}, ${scale},${scale})`;
    }
}