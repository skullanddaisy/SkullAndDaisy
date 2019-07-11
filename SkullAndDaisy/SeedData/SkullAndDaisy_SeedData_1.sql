--DROP DATABASE [ IF EXISTS ] { database_name | database_snapshot_name } [ ,...n ] [;]
IF EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'SkullAndDaisy'
)
    BEGIN
        -- Delete Database Backup and Restore History from MSDB System Database
        EXEC msdb.dbo.sp_delete_database_backuphistory @database_name = N'SkullAndDaisy'
        -- GO

        -- Close Connections
        USE [master]
        -- GO
        ALTER DATABASE [SkullAndDaisy] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
        -- GO

        -- Drop Database in SQL Server 
        DROP DATABASE [SkullAndDaisy]
        -- GO
    END


-- Create a new database called 'SkullAndDaisy'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'SkullAndDaisy'
)

CREATE DATABASE SkullAndDaisy
GO

USE [SkullAndDaisy]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Create all the tables --
CREATE TABLE [dbo].[Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderStatus] [varchar](50) NOT NULL,
	[Total] [decimal](18, 2) NOT NULL,
	[OrderDate] [datetime] NOT NULL,
	[PaymentTypeId] [int] NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[PaymentTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[AccountNumber] [varchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_PaymentTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[ProductOrders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Shipped] [bit] NOT NULL,
 CONSTRAINT [PK_ProductOrders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductTypeId] [int] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Title] [varchar](50) NOT NULL,
	[Description] [varchar](100) NOT NULL,
	[Quantity] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[ImageUrl] [varchar](500) NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[ProductTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ProductTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Username] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[ImageUrl] [varchar](200) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


-- Establish Relationships --

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_PaymentTypes] FOREIGN KEY([PaymentTypeId])
REFERENCES [dbo].[PaymentTypes] ([Id])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_PaymentTypes]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO

ALTER TABLE [dbo].[PaymentTypes] ADD  CONSTRAINT [DF_PaymentTypes_isActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[PaymentTypes]  WITH CHECK ADD  CONSTRAINT [FK_PaymentTypes_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[PaymentTypes] CHECK CONSTRAINT [FK_PaymentTypes_Users]
GO

ALTER TABLE [dbo].[ProductOrders]  WITH CHECK ADD  CONSTRAINT [FK_ProductOrders_Orders] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([Id])
GO

ALTER TABLE [dbo].[ProductOrders] CHECK CONSTRAINT [FK_ProductOrders_Orders]
GO

ALTER TABLE [dbo].[ProductOrders]  WITH CHECK ADD  CONSTRAINT [FK_ProductOrders_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO

ALTER TABLE [dbo].[ProductOrders] CHECK CONSTRAINT [FK_ProductOrders_Products]
GO

ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_ProductTypes] FOREIGN KEY([ProductTypeId])
REFERENCES [dbo].[ProductTypes] ([Id])
GO

ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_ProductTypes]
GO

ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Users]
GO

-- Users Seed Data
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Marshall','Offutt','marshall','marshalloffutt@gmail.com', 'https://avatars0.githubusercontent.com/u/40044635?s=400&u=b99d7a24f84dcd8f86e9125ea5d49cf91d5c6a77&v=4', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Austin','Cumberlander','austin','austincumberlander@gmail.com', 'https://avatars2.githubusercontent.com/u/24642982?s=460&v=4', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Jasmine','Walters','jasmine','jsmnwltrs@gmail.com', 'https://avatars1.githubusercontent.com/u/41760060?s=460&v=4', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Griggs','Vinheim','griggsy','gvinheim@dragonschool.com', 'https://66.media.tumblr.com/6ef45c63cad25ec0bb2a1f4f06b0e157/tumblr_pay4gwi7lD1wda7uro1_r1_400.png', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Rickert','Vinheim','ricky','rvinheim@dragonschool.com', 'https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/rickert--3.34.jpg', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Beatrice','Shierke','bshierke','witchbeatrice@gmail.com', 'https://vignette.wikia.nocookie.net/berserk/images/8/8b/Schierke_AV.png/revision/latest/scale-to-width-down/260?cb=20170513002224', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Bighat','Logan','bighat101','bighatlogan@gmail.com', 'https://pm1.narvii.com/6646/1f57dda441395ac60f09429041fd55ce7bd6de13_hq.jpg', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Quelana','Izalith','quelana','quelana@gmail.com', 'https://steamuserimages-a.akamaihd.net/ugc/3317211567279868612/818950D4B05B46D7D60DA89C32CE4AF1C6FB91FF/', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Quelaag','Izalith','quelaag','quelaag@gmail.com', 'https://2static.fjcdn.com/pictures/Souls+lore+quelaag+quelaan+residing+in+the+depths_11784d_5864705.jpg', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Dusk','Oolacile','dusk','dusk@oolacile.gov', 'http://orig08.deviantart.net/b997/f/2016/210/5/d/9_days_of_dark_souls__day_7_dusk_of_oolacile_by_zipfelzeus-dabsmov.jpg', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Oswald','Carim','ozzy','ozzy@poisonbites.com', 'https://cdna.artstation.com/p/assets/images/images/005/160/640/large/levente-hernadi-oswald-of-carim.jpg?1488932994', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Chester','Smith','marvelous_chester','mchester@bloodborne.com', 'http://soulslore.wdfiles.com/local--resized-images/data:marvellous-chester/chester2%281%29.jpg/medium.jpg', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Shiva','Of-The-East','hunter_dude','shiva@darkrootbasin.com', ' https://steamuserimages-a.akamaihd.net/ugc/29612379374756215/2C5676A8CDEC10F048D28BAC0AD5CA0A5168E065/', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Alvina','The-Cat','hunter_cat','alvina@darkrootbasin.com', 'https://vignette.wikia.nocookie.net/darksouls/images/3/33/Alvinacat.png/revision/latest?cb=20121226050716', 1)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [Email], [ImageUrl], [Active]) VALUES ('Artorias','The-Cursed','dark_knight','artorias@anor-lando.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5la8ybzNnCKYn7kYXVWrPRu-BFMWpLwY2318d6SfLuasNlXE1', 0)

-- PaymentTypes Seed Data
--Marshall's payment types 01-02
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 11223344, 1, 1)
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Discover', 22223344, 0, 1)

-- Austin payment types 03-04
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Mastercard', 11223344, 1, 2)
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 32233343, 0, 2)

-- Jasmine's payment types 05-06
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Discover', 24635733, 0, 3)
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('American Express', 82633743, 1, 3)

-- Grigg's payment types 07-08
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 11223344, 1, 4)
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Discover', 22223344, 1, 4)

-- Rickert's payment types 09-10
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Mastercard', 11223344, 1, 5)
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 72633743, 1, 5)

-- Beatrice's payment types 11
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Discover', 24635733, 1, 6)

-- Bighat Logan's payment types 12
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 4738437, 1, 7)

-- Quelana's payment types 13
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Discover', 95738957, 1, 8)

-- Quelaag's payment types 14
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('American Express', 264846738, 1, 9)

-- Dusk's payment types 15
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 85738533, 1, 10)

-- Oswald's payment types 16
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 5738573, 1, 11)

-- Chester's payment types 17
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Discover', 3845733, 1, 12)

-- Shiva's payment types 18
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Discover', 14745838, 1, 13)

-- Alvina's payment types 19
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('Visa', 6848495, 1, 14)

-- Artorias's payment types 20
INSERT INTO [dbo].[PaymentTypes] ([Name], [AccountNumber], [IsActive], [UserId]) VALUES ('American Express', 5834583, 1, 15)

-- ProductTypes Seed Data
INSERT INTO [dbo].[ProductTypes] ([Name]) VALUES ('Potions')
INSERT INTO [dbo].[ProductTypes] ([Name]) VALUES ('Poisons')
INSERT INTO [dbo].[ProductTypes] ([Name]) VALUES ('Herbs')
INSERT INTO [dbo].[ProductTypes] ([Name]) VALUES ('Healing Crystals')

-- Products Seed Data
-- Marshall's Potions 1-5
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Estus Flask', 'The Undead treasure these dull green flasks. Fill with Estus at bonfire. Fills HP.', 12.99, 50, 1, 1, 'https://vignette.wikia.nocookie.net/darksouls/images/0/08/Estus_Flask_%28DSIII%29_-_01.png/revision/latest?cb=20160613233757')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Bonfire Ascetic', 'Tossing this into a bonfire strengthens nearby foes.', 34.99, 50, 1, 1, 'https://vignette.wikia.nocookie.net/darksouls/images/3/35/Lightning_Urn_%28DSIII%29.png/revision/latest?cb=20160614082151')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Hidden Blessing', 'Holy water. Fully restores FP.', 16.49, 50, 1, 1, 'https://vignette.wikia.nocookie.net/darksouls/images/7/76/Hidden_Blessing.png/revision/latest/scale-to-width-down/350?cb=20160614082150')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Blue Bug Pellet', 'Harness the power of moon bugs.', 132.99, 50, 1, 1, 'https://vignette.wikia.nocookie.net/darksouls/images/1/18/Blue_Bug_Pellet.png/revision/latest/scale-to-width-down/350?cb=20160615022745')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Red Bug Pellet', 'Ease the suffering of burning.', 23.29, 50, 1, 1, 'https://vignette.wikia.nocookie.net/darksouls/images/f/fb/Red_Bug_Pellet.png/revision/latest/scale-to-width-down/350?cb=20160615024326')

-- Austin's Poisons 6-10
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Carthus Rouge', 'Temporarily applies bleeding effect to right-hand weapon.', 13.99, 30, 2, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/5/58/Carthus_Rouge.png/revision/latest/scale-to-width-down/350?cb=20160614082146')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Dung Pie', 'Although the stench makes it difficult to carry, turns an enemy toxic.', 34.99, 45, 2, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/3/38/Dung_Pie_%28DSIII%29.png/revision/latest?cb=20160613233757')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Charcoal Pine Bundle', 'A small bundle of charcoal pine resin.', 22.99, 22, 2, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/f/f0/Charcoal_Pine_Bundle.png/revision/latest?cb=20160614025803')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Pale Pine Resin', 'The blood red substance suggests there is more to this so-called resin than meets the eye.', 18.99, 45, 2, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/8/85/Pale_Pine_Resin.png/revision/latest/scale-to-width-down/350?cb=20160614082152')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Mossfruit', 'Tired of your kids? This will help get rid of them!', 6.99, 50, 2, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/6/60/Mossfruit.png/revision/latest/scale-to-width-down/350?cb=20160614082152')

-- Jasmine's Herbs 11-15
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Rime Blue Moss Clump', 'Provides a strong sense of both euphoria and calmness, and alleviates stress and anxiety.', 2.99, 50, 3, 3, 'https://vignette.wikia.nocookie.net/darksouls/images/5/56/Rime-blue_Moss_Clump.png/revision/latest/scale-to-width-down/350?cb=20160614025808')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Wolfs Blood Sword Grass', 'A swordgrass leaf stained with dried blood.', 5.99, 50, 3, 3, 'https://vignette.wikia.nocookie.net/darksouls/images/e/e7/Wolf%27s_Blood_Swordgrass.png/revision/latest/scale-to-width-down/350?cb=20160615024332')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Estus Shard', 'Prevents bloating and indigestion as it relaxes the spasms in the colon.', 1.99, 50, 3, 3, 'https://vignette.wikia.nocookie.net/darksouls/images/e/ee/Estus_Shard.png/revision/latest?cb=20160615024323')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Budding Green Blossom', 'Helps with memory, brain function, and nervous system repair. It is also neutral in taste.', 7.99, 50, 3, 3, 'https://vignette.wikia.nocookie.net/darksouls/images/1/10/Budding_Green_Blossom.png/revision/latest/scale-to-width-down/350?cb=20160615082921')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Stalk Dung Pie', 'Dried fecal waste material, marked by a long plank stalk that was not properly digested.', 4.99, 50, 3, 3, 'https://vignette.wikia.nocookie.net/darksouls/images/5/59/Stalk_Dung_Pie.png/revision/latest/scale-to-width-down/350?cb=20160614082340')

-- Austin's Healing Crystals 16-20
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Titanite', 'Titanite brings you good luck!', 65.99, 50, 4, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/5/5a/Titanite_Shard_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614025911')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Purple Gem', 'This dark gem will help you sleep at night.', 78.99, 50, 4, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/5/54/Deep_Gem.png/revision/latest?cb=20160614131711')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Chunk of Rock', 'This ugly thing wards off evil spirits.', 234.99, 50, 4, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/f/f9/Titanite_Chunk_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614025910')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Carved Slab', 'This rock has no magical value. But it looks nice.', 123.99, 50, 4, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/d/d6/Titanite_Slab_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614025912')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Twinkling Shard', 'Makes you feel good.', 543.99, 50, 4, 2, 'https://vignette.wikia.nocookie.net/darksouls/images/a/a7/Twinkling_Titanite_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614025912')

-- Griggs' Shop 21-23
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Alluring Skull', 'A skull-shaped container filled with vodka.', 4.99, 50, 1, 4, 'https://vignette.wikia.nocookie.net/darksouls/images/7/76/Alluring_Skull_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160613233752')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Prism Stones', 'Warm pebble emitting a beautiful phasing aura of seven colors, with a very rare eighth.', 2.99, 50, 4, 4, 'https://vignette.wikia.nocookie.net/darksouls/images/d/d3/Prism_Stone_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614025808')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Green Blossom', 'Green weed, shaped like a flower.', 4.99, 50, 3, 4, 'https://vignette.wikia.nocookie.net/darksouls/images/5/5e/Green_Blossom_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160613233851')

-- Rickert's Shop 24-26
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Bloodred Moss Clump', 'Red moss clump used as maggot repellent.', 6.99, 50, 3, 5, 'https://vignette.wikia.nocookie.net/darksouls/images/e/e0/Bloodred_Moss_Clump_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160613233755')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Purple Moss Clump', 'Reduces the accumulation of poison and cancels poisoned status.', 6.99, 50, 3, 5, 'https://vignette.wikia.nocookie.net/darksouls/images/f/fc/Purple_Moss_Clump_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614012225')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Blooming Moss Clump', 'Reduces the accumulation of poison and deadly poison and cancels Toxic status.', 12.99, 50, 3, 5, 'https://vignette.wikia.nocookie.net/darksouls/images/e/e3/Blooming_Purple_Moss_Clump_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160613233756')

-- Beatrice's Shop 27-29
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Purging Stone', 'Ash-colored stone encasing a skull. Breaks any curses you have.', 24.99, 50, 4, 6, 'https://vignette.wikia.nocookie.net/darksouls/images/0/03/Purging_Stone_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614012224')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Rotten Pine Resin', 'Pine resin that has rotted and turned poisonous. Likely rotten from the start.', 4.99, 50, 2, 6, 'https://vignette.wikia.nocookie.net/darksouls/images/e/ef/Rotten_Pine_Resin_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614025809')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Purifaction Nettles', 'Bitter, sour chestnut. Removes parasitic egg from body.', 2.99, 50, 3, 6, 'https://vignette.wikia.nocookie.net/darksouls/images/c/ce/Poison_Throwing_Knife_%28DSIII%29.png/revision/latest?cb=20160614012224')

-- Bighat's Shop 30-32
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Divine Blessing', 'Holy water endowed with a divine blessing.', 14.99, 50, 1, 7, 'https://vignette2.wikia.nocookie.net/darksouls/images/9/99/Divine_Blessing_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160613233850')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Black Bug Pellet', 'Medicinal pellet made from crushed insects.', 14.99, 50, 1, 7, 'https://vignette.wikia.nocookie.net/darksouls/images/5/58/Black_Bug_Pellet.png/revision/latest?cb=20160615024325')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Fungal Dregs', 'The heaviest bits of mushrooms that sink to the bottom.', 14.99, 50, 3, 7, 'https://vignette.wikia.nocookie.net/darksouls/images/5/50/Human_Dregs.png/revision/latest?cb=20160617093557')

-- Qualana's shop 33-36
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Poison Moss', 'A faintly poisonous clump of moss.', 3.99, 50, 3, 8, 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F07%2F13%2F12%2F56%2Fivy-1514398_640.png&f=1')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Amber Herb', 'An annual herb with an amber color so deep, it gives the impression of luminescence.', 2.99, 50, 3, 8, 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hautsinn.com%2Fwp-content%2Fuploads%2F2017%2F06%2Frosemary-2081980_640.png&f=1')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Twilight Herb', 'A gray herb that grows hidden among the rocky surfaces of tall mountains.', 2.99, 50, 3, 8, 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F53482890e4b0d938823fe923%2Ft%2F5a3a9f82e4966ba0debd6c06%2F1513791367980%2Frosemary.png&f=1')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Wilted Dusk Herb', 'A wilted and faded stalk of dusk herb.', 2.99, 50, 3, 8, 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fpre13.deviantart.net%2F5544%2Fth%2Fpre%2Fi%2F2014%2F284%2Fb%2F8%2Fwilted_flower_stock_photo_dsc__0278_by_annamae22-d82gnlv.png&f=1')

-- Qualaag's shop 37-40
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Fire Gem', 'A pretty red rock. Grows your wealth.', 12.99, 50, 4, 9, 'https://vignette.wikia.nocookie.net/darksouls/images/0/09/Fire_Gem.png/revision/latest/scale-to-width-down/350?cb=20160614082149')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Refined Gem', 'Fools Gold. Improves your intellect by having it around.', 6.99, 50, 4, 9, 'https://vignette.wikia.nocookie.net/darksouls/images/3/3e/Refined_Gem.png/revision/latest/scale-to-width-down/350?cb=20160614082153')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Shriving Stone', 'A weird rock. Invites you to fall deep inside.', 6.99, 50, 4, 9, 'https://vignette.wikia.nocookie.net/darksouls/images/7/72/Shriving_Stone.png/revision/latest/scale-to-width-down/350?cb=20160614145225')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Chaos Gem', 'A gem of infused titanite. Relics of land scorched by the Chaos Flame.', 3.99, 50, 4, 9, 'https://vignette.wikia.nocookie.net/darksouls/images/7/70/Chaos_Gem.png/revision/latest/scale-to-width-down/350?cb=20160614082147')

-- Dusk's shop 41-43
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Petrified Something', 'An unidentified petrified object.', 42.99, 6, 4, 10, 'https://vignette.wikia.nocookie.net/darksouls/images/f/fa/Hello_Carving_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160614025805')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Fragrant Branch of Yore', 'A fragrant tree branch with a faint sweet smell.', 24.99, 43, 3, 10, 'https://vignette.wikia.nocookie.net/darksouls/images/a/a0/Young_White_Branch.png/revision/latest/scale-to-width-down/350?cb=20160614082343')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Ashen Estus Flask', 'Some people treasure these dull ashen flasks. Drink to restore FP. ', 12.99, 50, 1, 10, 'https://vignette.wikia.nocookie.net/darksouls/images/5/52/Ashen_Estus_Flask_-_01.png/revision/latest/scale-to-width-down/350?cb=20160613233753')

-- Oswald's shop 44-45
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Charcoal Pine Resin', 'Black charcoal-like pine resin.', 6.99, 6, 2, 11, 'https://vignette.wikia.nocookie.net/darksouls/images/f/fd/Charcoal_Pine_Resin_%28DSIII%29.png/revision/latest/scale-to-width-down/350?cb=20160613233756')
INSERT INTO [dbo].[Products] ([Title], [Description], [Price], [Quantity], [ProductTypeId], [UserId], [ImageUrl]) VALUES ('Siegbräu', 'Perfect for travel in its jolly barrel mug.', 24.99, 50, 1, 11, 'https://vignette.wikia.nocookie.net/darksouls/images/f/fd/Siegbr%C3%A4u.png/revision/latest/scale-to-width-down/350?cb=20160615024327')


-- Orders Seed Data
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 8.98, 1, 1)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 145.98, 3, 2)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-06-14', 'Complete', 12.99, 5, 3)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-15', 'Complete', 29.98, 1, 1)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 7.98, 3, 2)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 29.98, 5, 3)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 9.98, 17, 12)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 1.99, 9, 5)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 189.98, 20, 15)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-05-01', 'Complete', 18.99, 14, 9)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-06-15', 'Pending', 8.98, 1, 1)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-06-15', 'Pending', 145.98, 3, 2)
INSERT INTO [dbo].[Orders] ([OrderDate], [OrderStatus], [Total], [PaymentTypeId], [UserId]) VALUES ('2019-06-15', 'Pending', 12.99, 5, 3)


-- ProductOrders Seed Data
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (1, 11, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (1, 12, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (2, 1, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (2, 4, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (3, 1, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (4, 30, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (4, 31, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (5, 22, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (5, 23, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (6, 27, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (6, 28, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (7, 13, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (7, 14, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (8, 13, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (9, 16, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (9, 19, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (10, 9, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (11, 11, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (11, 12, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (12, 1, 1, 0)
INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (12, 4, 1, 0)

INSERT INTO [dbo].[ProductOrders] ([OrderId], [ProductId], [Quantity], [Shipped]) VALUES (13, 1, 1, 0)