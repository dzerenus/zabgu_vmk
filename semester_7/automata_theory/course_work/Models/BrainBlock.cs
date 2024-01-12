namespace SnakeGen.Models;

public class BrainBlock
{
    public BrainNeuron Food { get; }

    public BrainNeuron Wall { get; }

    public BrainBlock(BrainNeuron food, BrainNeuron wall)
    {
        Food = food;
        Wall = wall;
    }
}

public class BrainNeuron 
{ 
    public int Continue { get; set; }
    public int Rotate { get; set; }

    public BrainNeuron(int @continue, int rotate)
    {
        Continue = @continue;
        Rotate = rotate;
    }
}
