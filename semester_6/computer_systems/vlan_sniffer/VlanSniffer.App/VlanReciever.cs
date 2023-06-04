using PcapDotNet.Core;
using PcapDotNet.Packets.Ethernet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
namespace VlanSniffer.App;

internal delegate void RecieverEventArgs(VlanPacket packet);

internal class VlanReciever
{
    public bool IsWork => _isWork;
    private bool _isWork = false;

    public event RecieverEventArgs? OnNewPacket;

    public void Start()
    {
        _isWork = true;
        var thread = new Thread(GetTraphic);
        thread.Start();
    }

    public void Stop()
    {
        _isWork = false;
    }

    private void GetTraphic()
    {
        var devices = LivePacketDevice.AllLocalMachine;
        var device = devices.Where(x => x.Description.ToLower().Contains("usb")).FirstOrDefault();
        var communicator = device?.Open(65536, PacketDeviceOpenAttributes.Promiscuous, 1000);

        if (communicator == null)
            throw new NullReferenceException();

        while (_isWork)
        {
            var result = communicator.ReceivePacket(out var packet);

            if (result != PacketCommunicatorReceiveResult.Ok)
                continue;

            var srcMac = packet.Ethernet.Source;
            var distMac = packet.Ethernet.Destination;
            var packetType = packet.Ethernet.EtherType;
            var vlan = packet.Ethernet.VLanTaggedFrame;

            if (vlan == null || packetType != EthernetType.VLanTaggedFrame)
                continue;

            var vlanType = vlan.EtherType;
            var vlanId = vlan.VLanIdentifier;
            var vlanCfiDei = vlan.CanonicalFormatIndicator;
            var vlanPriority = vlan.PriorityCodePoint;

            var vlanPacketInfo = new VlanPacket(srcMac, distMac, packetType, vlanId, vlanCfiDei, vlanPriority);
            OnNewPacket?.Invoke(vlanPacketInfo);
        }

        communicator.Dispose();
    }
}
