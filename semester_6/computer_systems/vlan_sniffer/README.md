# Протоколы вычислительных систем
### Сниффер протокола 802.1Q (VLAN)

Задание: Написать сниффер для протокола 802.1Q.  

**Статус** — **✓ (Зачтено)**  

**Инструкция по запуску:**  
> Сниффер работает только на USB-подключаемой сетевой карте, которая поддерживает протокол 802.1Q!
1. Если сетевая карта отрезает VLAN ID у входящих пакетов, запустить `VlanSniffer.Sender`, который каждые две секунды будет создавать и отправлять в сеть пакеты подписанные VLAN-тэгом;
2. Запустить `VlanSniffer.App` и нажать кнопку «Запустить».

Выполнено на: `.NET Core 7.0`  
При использовании: [PCAP.NET](https://github.com/PcapDotNet/Pcap.Net)

*ЗабГУ, ВМК-20, 2023*
