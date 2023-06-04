using PcapDotNet.Packets.Ethernet;
using PcapDotNet.Packets;
using System.Text;
using PcapDotNet.Core;

var interval = 2;

var devices = LivePacketDevice.AllLocalMachine;
var device = devices.Where(x => x.Description.ToLower().Contains("usb")).FirstOrDefault();

if (device == null)
    throw new NullReferenceException();

var ethernetLayer = new EthernetLayer
{
    Source = new MacAddress("01:01:01:01:01:01"),
    Destination = new MacAddress("02:02:02:02:02:02"),
    EtherType = EthernetType.None
};

var vLanTaggedFrameLayer = new VLanTaggedFrameLayer
{
    PriorityCodePoint = ClassOfService.Background,
    CanonicalFormatIndicator = false,
    VLanIdentifier = 50,
    EtherType = EthernetType.IpV4,
};

var payloadLayer = new PayloadLayer
{
    Data = new Datagram(Encoding.ASCII.GetBytes("hello world")),
};

using var communicator = device.Open();

while (true)
{
    var builder = new PacketBuilder(ethernetLayer, vLanTaggedFrameLayer, payloadLayer);
    var packet = builder.Build(DateTime.Now);

    communicator.SendPacket(packet);

    Thread.Sleep(interval * 1000);
}

