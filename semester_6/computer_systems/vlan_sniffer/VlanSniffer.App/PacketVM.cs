namespace VlanSniffer.App;

public class PacketVM
{
    public string MacSource { get; set; }
    public string MacDestination { get; set; }
    public string PacketType { get; set; }
    public string VlanPriority { get; set; }
    public string VlanCefDei { get; set; }
    public string VlanId { get; set; }

    public PacketVM(VlanPacket packet)
    {
        MacSource = packet.Source.ToString();
        MacDestination = packet.Destination.ToString();
        PacketType = "0x" + ((int)packet.PacketType).ToString("X");
        VlanPriority = ((int)packet.VlanPriority).ToString();
        VlanCefDei = packet.VlanCfi ? "1" : "0";
        VlanId = packet.VlanId.ToString();
    }
}
