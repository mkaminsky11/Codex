import java.nio.ByteOrder;
import java.nio.file.*;
import java.io.File;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

public class main {
    public static void main(String[] args) {
        if(args[0].equals("image")) {
            convertImage(args[1]);
        }
        else if(args[0].equals("folder")) {
            String folder = args[1];
            File dir = new File(folder);
            String contents[] = dir.list();
            for(int i = 0; i < contents.length; i++) {
                if(contents[i].endsWith(".atex")) {
                    String path = Paths.get(dir.getPath().toString(), contents[i]).toString();
                    convertImage(path);
                }
            }
        }
    }

    public static void convertImage(String source) {
        try {
            String out = source + ".png";

            Path fileLocation = Paths.get(source);
            byte[] data = Files.readAllBytes(fileLocation);

            TextureFile tex = new TextureFile(data, ByteOrder.LITTLE_ENDIAN);
            BufferedImage preview = tex.decode(0, null);
            File outputfile = new File(out);
            ImageIO.write(preview, "png", outputfile);
        }
        catch(Exception e) {
            System.out.println("error");
        }
    }
}