# Mi PC — Ficha de hardware

> Documento de referencia con la configuración actual del equipo, para futuras
> actualizaciones y seguimiento de la progresión del hardware.

Última actualización: 2026-07-20

## Objetivo de uso

- Desarrollo / programación
- Edición de vídeo, foto y 3D

## Presupuesto de actualización (horizonte 6 meses)

500€ – 1500€

## Componentes actuales

| Componente | Detalle |
|---|---|
| Torre | Nox Infinity Omega ARGB USB 3.0 con ventana |
| Placa base | Gigabyte B450M DS3H (soporta actualización de BIOS para Ryzen serie 5000) |
| CPU | AMD Ryzen 5 3400G 3.7GHz BOX — **cuello de botella actual del sistema** |
| RAM | 32 GB DDR4 3200MHz (2x8GB Kingston HyperX Fury Black + 2x8GB Kingston Fury RGB) |
| Almacenamiento principal (OS/Apps) | WD Black SN770 2TB NVMe Gen4 — disco de sistema y scratch/caché |
| Almacenamiento externo/red | NAS en RAID (2x4TB) + 1 disco independiente de 10TB para archivo |
| GPU | NVIDIA RTX 3060 12GB |

## Red

| Elemento | Detalle |
|---|---|
| Router / ONT | ZTE ZXHN F6640 — router-ONT de fibra (GPON) del ISP, certificado WiFi 6, fecha SEP 2022 |
| Switch | D-Link DGS-105 (GS-105) — switch no gestionado de 5 puertos Gigabit (10/100/1000) |
| NAS (marca/modelo) | *Pendiente* (RAID 2x4TB + disco independiente de 10TB, ver almacenamiento) |
| Tarjeta de red del PC | Integrada en la placa base (Gigabyte B450M DS3H), Gigabit Ethernet |
| Conexión a internet | Fibra (FTTH/GPON) — velocidad contratada *pendiente de confirmar* |

## Diagnóstico

El principal cuello de botella es la **CPU** (Ryzen 5 3400G, 2019, 4 núcleos/8 hilos),
que limita el rendimiento de la RTX 3060 12GB tanto en tareas de desarrollo como en
edición de vídeo/3D. La placa base **B450M DS3H admite Ryzen serie 5000** mediante
actualización de BIOS, lo que permite un salto de rendimiento importante sin cambiar
placa ni RAM.

En la red, todo el tramo local es **Gigabit uniforme** (switch D-Link DGS-105 1G,
tarjeta de red integrada 1G): no es el cuello de botella principal, pero limita la
velocidad de transferencia con el NAS para flujos de trabajo de vídeo (footage 4K/8K).
Una mejora a 2.5GbE (switch + tarjeta de red del PC) sería una mejora secundaria,
no urgente, si el NAS también soporta 2.5G.

## Propuesta de actualización (julio 2026)

Todas las opciones de CPU son **socket AM4**, compatibles con la placa base actual
(Gigabyte B450M DS3H) tras actualizar la BIOS a una versión que soporte Ryzen serie
5000 (proceso normal vía Q-Flash desde el propio BIOS, ya que el Ryzen 5 3400G actual
arranca sin problema y permite hacer la actualización sin necesidad de "flashback").
No haría falta cambiar placa base ni RAM.

### Opción A — CPU (imprescindible, soluciona el cuello de botella)

| CPU | Núcleos/Hilos | Pros | Contras | Precio aprox. | Enlace |
|---|---|---|---|---|---|
| AMD Ryzen 7 5700X3D | 8/16, hasta 4,1 GHz, 96MB caché 3D | El más barato de los tres; salto enorme respecto al 3400G; bajo consumo (105W) | Frecuencias algo más bajas que el 5800X3D | ~230-300€ | [PcComponentes](https://www.pccomponentes.com/amd-ryzen-7-5700x3d-3-41ghz-box) |
| AMD Ryzen 7 5800X3D (10th Anniversary) | 8/16, hasta 4,5 GHz, 96MB caché 3D | Mejor CPU AM4 para gaming y apps sensibles a caché; relanzado en 2026 más barato que en su lanzamiento | No trae disipador; TDP 105W | ~330-360€ | [PcComponentes](https://www.pccomponentes.com/procesador-amd-ryzen-7-5800x3d-8-nucleos-3-4-ghz-base-4-5-ghz-turbo-96-mb-cache-l3) |
| AMD Ryzen 9 5900X | 12/24, hasta 4,8 GHz | Más núcleos: ideal para renderizado (Blender/DaVinci), exportación de vídeo y VMs/contenedores de desarrollo en paralelo | Más caro; no incluye disipador; más consumo | ~450-570€ | [Coolmod](https://www.coolmod.com/amd-ryzen-9-5900x-48ghz-socket-am4-boxed-procesador/) · [idealo](https://www.idealo.es/precios/200732985/amd-ryzen-9-5900x.html) |

**Disipador recomendado** (ninguna de las CPU anteriores incluye uno adecuado):
Thermalright Peerless Assassin 120 SE (doble torre, apto AM4) — ~35-40€ —
[idealo](https://www.idealo.es/precios/202870980/thermalright-peerless-assassin-120-se.html)

### Opción B — GPU (opcional, solo si sobra presupuesto)

La RTX 3060 12GB sigue siendo válida para desarrollo y edición en 1080p/1440p una vez
resuelto el cuello de botella de CPU. Los precios de GPU en 2026 están altos por la
escasez de memoria VRAM, así que esta opción solo compensa si el presupuesto lo permite.

| GPU | Pros | Contras | Precio aprox. | Enlace |
|---|---|---|---|---|
| Mantener RTX 3060 12GB | Coste cero; ya es suficiente tras el cambio de CPU | Menos rendimiento en render 3D/IA que las opciones nuevas | 0€ | — |
| RTX 4060 Ti 16GB | Más VRAM (útil para Blender/Premiere/DaVinci y modelos de IA locales) | Salto de precio importante; poca mejora en rasterizado puro vs 3060 | ~515-700€ | [idealo (ASUS)](https://www.idealo.es/precios/202795448/asus-geforce-rtx-4060-ti.html) |
| RTX 4070 Super 12GB | Salto de rendimiento notable en render/edición | Se come casi todo el presupuesto de 6 meses; precios inflados en 2026 | ~880€+ | [idealo (ASUS)](https://www.idealo.es/precios/203742391/asus-geforce-rtx-4070-super.html) |

### Opción C — Red (mejora secundaria, no urgente)

El router-ONT (ZTE F6640) y el switch (D-Link DGS-105) funcionan bien, pero todo el
tramo LAN es Gigabit. Si el NAS lo soporta, subir a 2.5GbE acelera las transferencias
de footage de vídeo entre el PC y el NAS.

| Componente | Pros | Contras | Precio aprox. | Enlace |
|---|---|---|---|---|
| TP-Link TL-SG105-M2 (switch 5p 2.5GbE) | Sin ventilador (silencioso), plug-and-play, usa el cableado Cat5e/6 existente | No aporta nada si el NAS no tiene puerto 2.5G | ~49€ | [idealo](https://www.idealo.es/precios/201050249/tp-link-5-port-2-5-gigabit-switch-tl-sg105-m2.html) |
| TP-Link TX201 (tarjeta PCIe 2.5GbE) | Barata, fácil de instalar, libera el puerto integrado 1G | Requiere un slot PCIe libre en la placa | ~17-20€ | [PcComponentes](https://www.pccomponentes.com/tp-link-tx201-tarjeta-de-red-25-gigabit-pcie) |

### Paquetes recomendados (según presupuesto 500-1500€)

| Paquete | Contenido | Coste total aprox. | Recomendado si... |
|---|---|---|---|
| **Básico** | Ryzen 7 5700X3D + disipador | ~270-340€ | Quieres resolver el cuello de botella gastando lo mínimo |
| **Equilibrado** (recomendado) | Ryzen 7 5800X3D + disipador + switch y NIC 2.5GbE | ~420-450€ | Quieres el mejor CPU gaming/creación de AM4 y de paso mejoras la velocidad con el NAS |
| **Máximo rendimiento** | Ryzen 9 5900X + disipador + switch y NIC 2.5GbE | ~540-660€ | Priorizas núcleos para render/exportación y multitarea de desarrollo (deja margen del presupuesto sin tocar la GPU) |

Con cualquiera de los tres paquetes sobra presupuesto (dentro del rango 500-1500€) para,
si se desea más adelante, dar el salto de GPU (Opción B) sin comprometer el resto.

## Historial de actualizaciones

| Fecha | Cambio |
|---|---|
| 2026-07-20 | Ficha inicial creada con el listado de componentes actuales |
| 2026-07-20 | Añadidos datos de red: router-ONT ZTE ZXHN F6640 (WiFi 6, GPON) y switch D-Link DGS-105 (5 puertos Gigabit) |
| 2026-07-20 | Añadida propuesta de actualización con tablas comparativas de CPU, GPU y red, y enlaces de compra |
