using PcapDotNet.Packets.Ethernet;

namespace VlanSniffer.App;

public class VlanPacket
{
    public MacAddress Source { get; }
    public MacAddress Destination { get; }
    public EthernetType PacketType { get; }
    public ushort VlanId { get; }
    public bool VlanCfi { get; }
    public ClassOfService VlanPriority { get; }

    public VlanPacket(MacAddress source, MacAddress destination, EthernetType packetType, ushort vlanId, bool vlanCfi, ClassOfService vlanPriority)
    {
        Source = source;
        Destination = destination;
        PacketType = packetType;
        VlanId = vlanId;
        VlanCfi = vlanCfi;
        VlanPriority = vlanPriority;
    }
}
